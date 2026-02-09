import { redirect, notFound } from 'next/navigation'

// Redirect /products/[slug] to /services/[slug]
// Products are accessed through the services page for now

const products = [
  { slug: 'atelier-culturel-1', service: 'atelier-culturel-1' },
  { slug: 'ateliers-culturels-3', service: 'ateliers-culturels-3' },
  { slug: 'diner-spectacle', service: 'diner-spectacle' },
  { slug: 'spectacle-seul', service: 'spectacle-seul' },
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  // Redirect to the service page
  redirect(`/services/${product.service}`)
}
