"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      console.error("Uncaught error:", error, errorInfo)
      // TODO: Send to error monitoring service (e.g., Sentry)
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
              <p className="text-gray-400 mb-6">
                We apologize for the inconvenience. Please try refreshing the page or contact support if the problem
                persists.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-teal-500 text-black font-medium py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
