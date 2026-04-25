import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark flex items-center">
      <div className="section-wrapper py-24">
        <div className="max-w-2xl mx-auto text-center glass-card p-10 sm:p-12">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#F5C518' }}>
            404
          </p>
          <h1 className="section-title mb-4">
            This page could not be <span className="gradient-text">found</span>
          </h1>
          <p className="text-text-muted max-w-xl mx-auto mb-8">
            The link may have changed, or the page may no longer exist. You can head back to the portfolio or jump straight to the contact section.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/en" className="btn-primary">Back to Portfolio</Link>
            <Link href="/en#contact" className="btn-outline">Contact Salah</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
