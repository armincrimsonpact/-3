"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useAccessibility } from '@/lib/hooks/useAccessibility'
import { cn } from '@/lib/utils'

interface NavigationItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  children?: NavigationItem[]
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

interface AccessibleNavigationProps {
  items: NavigationItem[]
  orientation?: 'horizontal' | 'vertical'
  className?: string
  onNavigate?: (item: NavigationItem) => void
}

export function AccessibleNavigation({
  items,
  orientation = 'horizontal',
  className = '',
  onNavigate
}: AccessibleNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const navRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())
  
  const { 
    keyboardNavigation, 
    focusManagement, 
    aria, 
    screenReader,
    isReducedMotion 
  } = useAccessibility()

  // Generate navigation ID
  const navId = aria.generateId('nav')

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!navRef.current) return

    const focusableItems = items.filter(item => !item.disabled)
    const currentElements = Array.from(itemRefs.current.values())

    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        e.preventDefault()
        const newIndex = keyboardNavigation.handleArrowKeys(
          e.nativeEvent,
          currentElements,
          focusedIndex,
          { 
            orientation: orientation === 'horizontal' ? 'horizontal' : 'vertical',
            loop: true 
          }
        )
        setFocusedIndex(newIndex)
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < focusableItems.length) {
          handleItemActivation(focusableItems[focusedIndex])
        }
        break

      case 'Escape':
        // Close any expanded menus
        setExpandedItems(new Set())
        screenReader.announce('Menus closed')
        break

      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        currentElements[0]?.focus()
        break

      case 'End':
        e.preventDefault()
        const lastIndex = currentElements.length - 1
        setFocusedIndex(lastIndex)
        currentElements[lastIndex]?.focus()
        break
    }
  }, [focusedIndex, items, keyboardNavigation, orientation, screenReader])

  // Handle item activation (click/enter/space)
  const handleItemActivation = useCallback((item: NavigationItem) => {
    if (item.disabled) return

    if (item.children?.length) {
      // Toggle submenu
      const newExpanded = new Set(expandedItems)
      if (newExpanded.has(item.id)) {
        newExpanded.delete(item.id)
        screenReader.announce(`${item.label} menu collapsed`)
      } else {
        newExpanded.add(item.id)
        screenReader.announce(`${item.label} menu expanded`)
      }
      setExpandedItems(newExpanded)
    } else {
      // Navigate or trigger action
      if (item.onClick) {
        item.onClick()
      }
      if (onNavigate) {
        onNavigate(item)
      }
      screenReader.announce(`Navigating to ${item.label}`)
    }
  }, [expandedItems, onNavigate, screenReader])

  // Set item ref
  const setItemRef = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      itemRefs.current.set(id, element)
    } else {
      itemRefs.current.delete(id)
    }
  }, [])

  // Handle focus changes
  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Only clear focus if focus is leaving the navigation entirely
    if (!navRef.current?.contains(e.relatedTarget as Node)) {
      setFocusedIndex(-1)
    }
  }, [])

  // Render navigation item
  const renderNavigationItem = (item: NavigationItem, index: number, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isFocused = focusedIndex === index
    
    const itemAttributes = aria.createAttributes({
      expanded: hasChildren ? isExpanded : undefined,
      disabled: item.disabled,
      level: level + 1,
      setSize: items.length,
      posInSet: index + 1
    })

    const content = (
      <span className="flex items-center gap-2">
        {item.icon && (
          <span aria-hidden="true" className="flex-shrink-0">
            {item.icon}
          </span>
        )}
        <span>{item.label}</span>
        {item.badge && (
          <span 
            className="bg-primary text-black text-xs px-2 py-1 rounded-full"
            aria-label={`${item.badge} notifications`}
          >
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <span 
            aria-hidden="true" 
            className={cn(
              'transition-transform duration-200',
              isExpanded && 'rotate-180',
              isReducedMotion && 'transition-none'
            )}
          >
            ⌄
          </span>
        )}
      </span>
    )

    const baseClasses = cn(
      'block w-full px-4 py-2 text-left rounded-md transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',
      'hover:bg-textTertiary/10',
      isFocused && 'bg-textTertiary/20 ring-2 ring-primary/50',
      item.disabled && 'opacity-50 cursor-not-allowed',
      isReducedMotion && 'transition-none'
    )

    const element = item.href ? (
      <Link
        href={item.href}
        ref={(el) => setItemRef(item.id, el)}
        className={baseClasses}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        onClick={() => handleItemActivation(item)}
        {...itemAttributes}
        aria-current={isFocused ? 'true' : undefined}
      >
        {content}
      </Link>
    ) : (
      <button
        ref={(el) => setItemRef(item.id, el)}
        type="button"
        className={baseClasses}
        onFocus={() => handleFocus(index)}
        onBlur={handleBlur}
        onClick={() => handleItemActivation(item)}
        {...itemAttributes}
        aria-current={isFocused ? 'true' : undefined}
      >
        {content}
      </button>
    )

    return (
      <li key={item.id} role="none">
        {element}
        
        {/* Submenu */}
        {hasChildren && (
          <ul
            role="menu"
            aria-labelledby={item.id}
            className={cn(
              'mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200',
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
              isReducedMotion && 'transition-none'
            )}
            aria-hidden={!isExpanded}
          >
            {isExpanded && item.children?.map((childItem, childIndex) =>
              renderNavigationItem(childItem, items.length + childIndex, level + 1)
            )}
          </ul>
        )}
      </li>
    )
  }

  return (
    <nav
      ref={navRef}
      id={navId}
      className={cn('focus-within:ring-2 focus-within:ring-primary/50 rounded-md', className)}
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <ul
        role="menubar"
        aria-orientation={orientation}
        className={cn(
          'space-y-1',
          orientation === 'horizontal' && 'flex flex-wrap space-y-0 space-x-1'
        )}
      >
        {items.map((item, index) => renderNavigationItem(item, index))}
      </ul>
    </nav>
  )
}

// Specialized navigation components
export function AccessibleBreadcrumb({
  items,
  className = ''
}: {
  items: Array<{ label: string; href?: string }>
  className?: string
}) {
  const { aria } = useAccessibility()
  const breadcrumbId = aria.generateId('breadcrumb')

  return (
    <nav
      id={breadcrumbId}
      aria-label="Breadcrumb navigation"
      className={cn('text-sm', className)}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <span 
                aria-hidden="true" 
                className="text-textTertiary mx-2"
              >
                /
              </span>
            )}
            {item.href ? (
              <Link 
                href={item.href}
                className="text-textTertiary hover:text-textSecondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className="text-textSecondary font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Tab navigation component
export function AccessibleTabs({
  tabs,
  activeTab,
  onTabChange,
  className = ''
}: {
  tabs: Array<{ id: string; label: string; content?: React.ReactNode; disabled?: boolean }>
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}) {
  const [focusedTab, setFocusedTab] = useState(0)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const { keyboardNavigation, aria } = useAccessibility()

  const tabListId = aria.generateId('tablist')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const tabElements = Array.from(tabRefs.current.values())
    
    const newIndex = keyboardNavigation.handleArrowKeys(
      e.nativeEvent,
      tabElements,
      focusedTab,
      { orientation: 'horizontal', loop: true }
    )
    
    if (newIndex !== focusedTab) {
      setFocusedTab(newIndex)
      const newTab = tabs[newIndex]
      if (newTab && !newTab.disabled) {
        onTabChange(newTab.id)
      }
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        id={tabListId}
        aria-label="Content tabs"
        className="flex border-b border-textTertiary/20"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab
          const isFocused = focusedTab === index
          
          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(tab.id, el)
                } else {
                  tabRefs.current.delete(tab.id)
                }
              }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              aria-disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                'px-4 py-2 border-b-2 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1',
                isActive 
                  ? 'border-primary text-primary bg-primary/5' 
                  : 'border-transparent text-textTertiary hover:text-textSecondary hover:border-textTertiary/50',
                tab.disabled && 'opacity-50 cursor-not-allowed',
                isFocused && 'ring-2 ring-primary/50'
              )}
              onClick={() => {
                if (!tab.disabled) {
                  onTabChange(tab.id)
                  setFocusedTab(index)
                }
              }}
              onFocus={() => setFocusedTab(index)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      
      {tabs.map(tab => (
        <div
          key={`${tab.id}-panel`}
          id={`${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={tab.id !== activeTab}
          className="mt-4 focus:outline-none"
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
} 