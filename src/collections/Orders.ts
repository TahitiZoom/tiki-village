import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'user', 'total', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      // Users can only see their own orders
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
      name: 'orderNumber',
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
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'booking',
          type: 'relationship',
          relationTo: 'bookings',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            description: 'Unit price in XPF',
          },
        },
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          admin: {
            description: 'Item subtotal in XPF',
          },
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      admin: {
        description: 'Order subtotal in XPF',
      },
    },
    {
      name: 'discount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Discount amount in XPF',
      },
    },
    {
      name: 'promoCode',
      type: 'relationship',
      relationTo: 'promotions',
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        description: 'Order total in XPF',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending Payment', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Paid', value: 'paid' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'unpaid',
      options: [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'PayZen - Credit Card', value: 'payzen_card' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'Cash', value: 'cash' },
      ],
    },
    {
      name: 'paymentDetails',
      type: 'group',
      fields: [
        {
          name: 'transactionId',
          type: 'text',
          admin: {
            description: 'PayZen transaction ID',
          },
        },
        {
          name: 'paymentDate',
          type: 'date',
        },
        {
          name: 'cardType',
          type: 'text',
        },
        {
          name: 'cardNumber',
          type: 'text',
          admin: {
            description: 'Last 4 digits',
          },
        },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      required: true,
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
          name: 'company',
          type: 'text',
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
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'region',
          type: 'text',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'Polynésie Française',
        },
      ],
    },
    {
      name: 'customerNotes',
      type: 'textarea',
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        condition: (data, siblingData, { user }) => user?.role === 'admin',
      },
    },
  ],
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ operation, data }) => {
        if (operation === 'create' && !data.orderNumber) {
          // Generate order number
          const timestamp = Date.now()
          const random = Math.floor(Math.random() * 10000)
          data.orderNumber = `TKV-${timestamp}-${random}`
        }
        return data
      },
    ],
  },
}
