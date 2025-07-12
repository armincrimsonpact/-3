import { Button } from "@/components/ui/button"
import { HoverButton } from "@/components/ui/hover-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { HoverFillButton } from "@/components/ui/hover-fill-button"

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-bg text-textPrimary p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-textSecondary">Button Component Demo</h1>

        <div className="space-y-16">
          {/* Standard Button Variants */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Standard Button Variants</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Button</Button>
              <Button variant="link">Link Button</Button>
              <Button variant="ultra">Ultra Button</Button>
            </div>
          </section>

          {/* Button Sizes */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="default">Default Button</Button>
              <Button size="lg">Large Button</Button>
              <Button size="icon">🎨</Button>
            </div>
          </section>

          {/* Button Animations */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Button Animations</h2>
            <div className="flex flex-wrap gap-4">
              <Button animation="none">No Animation</Button>
              <Button animation="press">Press Animation</Button>
              <Button animation="ripple">Ripple Animation</Button>
              <Button animation="fill" variant="outline">
                Fill Animation
              </Button>
            </div>
          </section>

          {/* Hover Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Hover Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <HoverButton variant="primary">Primary Hover</HoverButton>
              <HoverButton variant="secondary">Secondary Hover</HoverButton>
              <HoverButton variant="outline">Outline Hover</HoverButton>
              <HoverButton variant="ghost">Ghost Hover</HoverButton>
              <HoverButton variant="ultra">Ultra Hover</HoverButton>
            </div>
          </section>

          {/* Ripple Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Ripple Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <RippleButton variant="primary">Primary Ripple</RippleButton>
              <RippleButton variant="secondary">Secondary Ripple</RippleButton>
              <RippleButton variant="outline">Outline Ripple</RippleButton>
              <RippleButton variant="ghost">Ghost Ripple</RippleButton>
              <RippleButton variant="ultra">Ultra Ripple</RippleButton>
            </div>
          </section>

          {/* Fill Buttons */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Fill Animation Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <HoverFillButton variant="primary" fillDirection="vertical">
                Vertical Fill
              </HoverFillButton>
              <HoverFillButton variant="ultra" fillDirection="horizontal">
                Horizontal Fill
              </HoverFillButton>
              <HoverFillButton variant="outline" fillDirection="diagonal">
                Diagonal Fill
              </HoverFillButton>
              <HoverFillButton variant="secondary" fillDirection="vertical">
                Secondary Fill
              </HoverFillButton>
            </div>
          </section>

          {/* Disabled States */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Disabled States</h2>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
              <Button variant="outline" disabled>
                Disabled Outline
              </Button>
              <HoverButton disabled>Disabled Hover</HoverButton>
              <RippleButton disabled>Disabled Ripple</RippleButton>
            </div>
          </section>

          {/* Real-world Examples */}
          <section className="p-8 bg-cardBg rounded-lg border border-primary/20">
            <h2 className="text-2xl font-semibold mb-6 text-textSecondary">Real-world Examples</h2>

            {/* CTA Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-textSecondary">Call to Action</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="font-semibold">
                  Book Your Tattoo
                </Button>
                <Button variant="outline" size="lg">
                  Browse Artists
                </Button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-textSecondary">Form Actions</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <Button variant="ghost">Cancel</Button>
                  <Button variant="secondary">Save Draft</Button>
                </div>
                <Button>Submit Application</Button>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-textSecondary">Navigation</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  ← Previous
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button size="sm">2</Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="ghost" size="sm">
                  Next →
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
