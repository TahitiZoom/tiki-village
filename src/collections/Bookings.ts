import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingNumber',
    defaultColumns: ['bookingNumber', 'product', 'date', 'status', 'user'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only see their own bookings
      return {
        user: {
          equals: user?.id,
        },
      }
    },
    create: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'bookingNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'participants',
      type: 'group',
      fields: [
        {
          name: 'adults',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'children',
          type: 'number',
          min: 0,
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'selectedExtras',
      type: 'array',
      fields: [
        {
          name: 'extraName',
          type: 'text',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      required: true,
      admin: {
        description: 'Total price in XPF',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'customerInfo',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      admin: {
        description: 'Associated order if booking was purchased',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (operation === 'create' && !data.bookingNumber) {
          // Generate booking number
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 1000)
          data.bookingNumber = `BK-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
}
