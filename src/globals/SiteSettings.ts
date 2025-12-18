import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Tiki Village',
      localized: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'defaultSEO',
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
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
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
          name: 'address',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'googleMapsUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'businessHours',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Monday', value: 'monday' },
            { label: 'Tuesday', value: 'tuesday' },
            { label: 'Wednesday', value: 'wednesday' },
            { label: 'Thursday', value: 'thursday' },
            { label: 'Friday', value: 'friday' },
            { label: 'Saturday', value: 'saturday' },
            { label: 'Sunday', value: 'sunday' },
          ],
        },
        {
          name: 'open',
          type: 'text',
        },
        {
          name: 'close',
          type: 'text',
        },
        {
          name: 'closed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'currency',
      type: 'group',
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
          defaultValue: 'XPF',
        },
        {
          name: 'symbol',
          type: 'text',
          required: true,
          defaultValue: 'XPF',
        },
        {
          name: 'decimalPlaces',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'XPF typically uses 0 decimal places',
          },
        },
      ],
    },
    {
      name: 'gdpr',
      type: 'group',
      fields: [
        {
          name: 'cookieConsent',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'cookieMessage',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'privacyPolicyPage',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
    {
      name: 'maintenance',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'message',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
