import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'category', 'bookable', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Brief description for product cards',
      },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Price in XPF (Franc Pacifique)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'bookable',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this product bookable with a calendar?',
      },
    },
    {
      name: 'bookingSettings',
      type: 'group',
      admin: {
        condition: (data) => data.bookable === true,
      },
      fields: [
        {
          name: 'availableDays',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
          admin: {
            description: 'Days when this service is available',
          },
        },
        {
          name: 'maxParticipants',
          type: 'number',
          admin: {
            description: 'Maximum number of participants per booking',
          },
        },
        {
          name: 'childrenAllowed',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'childrenPrice',
          type: 'number',
          admin: {
            condition: (data, siblingData) => siblingData.childrenAllowed === true,
            description: 'Price for children under 12 years (XPF)',
          },
        },
      ],
    },
    {
      name: 'extras',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'priceAdult',
          type: 'number',
          required: true,
          admin: {
            description: 'Extra price for adults (XPF)',
          },
        },
        {
          name: 'priceChild',
          type: 'number',
          admin: {
            description: 'Extra price for children (XPF)',
          },
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Transfer', value: 'transfer' },
            { label: 'Package', value: 'package' },
            { label: 'Option', value: 'option' },
          ],
        },
      ],
      admin: {
        description: 'Extra options available for this product',
      },
    },
    {
      name: 'weddingOptions',
      type: 'group',
      admin: {
        condition: (data) => {
          // Show only for wedding products
          return data.category && typeof data.category === 'object' && 
                 data.category.slug === 'mariages'
        },
      },
      fields: [
        {
          name: 'includedServices',
          type: 'richText',
          localized: true,
          admin: {
            description: 'List of services included in the wedding package',
          },
        },
        {
          name: 'additionalOptions',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'price',
              type: 'number',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'additionalGuests',
          type: 'group',
          fields: [
            {
              name: 'adultPrice',
              type: 'number',
              defaultValue: 10500,
              admin: {
                description: 'Price per additional adult guest (XPF)',
              },
            },
            {
              name: 'childPrice',
              type: 'number',
              defaultValue: 4950,
              admin: {
                description: 'Price per additional child guest (XPF)',
              },
            },
          ],
        },
        {
          name: 'cancellationPolicy',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
      admin: {
        description: 'Key features or highlights',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
  timestamps: true,
}
