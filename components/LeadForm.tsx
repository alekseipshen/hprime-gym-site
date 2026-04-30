'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => val.replace(/\D/g, '').length === 10, 'Please enter a complete 10-digit phone number'),
  email: z.string().email('Please enter a valid email'),
  street: z.string().min(3, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Please enter a valid 5-digit ZIP code'),
  message: z.string().min(5, 'Please describe the issue (minimum 5 characters)'),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  variant?: 'section' | 'modal';
  onSuccess?: () => void;
}

export default function LeadForm({ variant = 'section', onSuccess }: LeadFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const cleanedPhone = data.phone.replace(/\D/g, '');
      const cleanText = (text: string) =>
        text.replace(/["']/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

      let attribution: Record<string, string> = {};
      try {
        const stored = sessionStorage.getItem('hprime_attribution');
        if (stored) attribution = JSON.parse(stored);
      } catch {
        // sessionStorage unavailable, skip
      }

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: cleanedPhone,
          email: data.email,
          street: cleanText(data.street),
          apartment: cleanText(data.apartment || ''),
          city: cleanText(data.city),
          zipCode: data.zipCode,
          equipment: cleanText(data.message),
          attribution,
          submission_page: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && (window as { dataLayer?: Record<string, unknown>[] }).dataLayer) {
          (window as { dataLayer: Record<string, unknown>[] }).dataLayer.push({
            event: 'lead_submitted',
            enhanced_conversions: {
              email: data.email,
              phone_number: `+1${cleanedPhone}`,
              first_name: data.firstName,
              last_name: data.lastName,
              street: data.street,
              city: data.city,
              region: 'CO',
              postal_code: data.zipCode,
              country: 'US',
            },
          });
        }
        setSubmitStatus('success');
        reset();
        if (onSuccess) onSuccess();
        router.push('/thank-you-page');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
            First name *
          </label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
            Last name *
          </label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Smith"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone *
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PatternFormat
                {...field}
                format="(###) ###-####"
                mask="_"
                placeholder="(720) 555-0123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            E-mail address *
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
          Street address *
        </label>
        <input
          {...register('street')}
          type="text"
          id="street"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Main Street"
        />
        {errors.street && (
          <p className="text-red-600 text-sm mt-1">{errors.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="apartment" className="block text-sm font-semibold text-gray-700 mb-2">
            Unit / apartment / suite
          </label>
          <input
            {...register('apartment')}
            type="text"
            id="apartment"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Apt 4B"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
            City *
          </label>
          <input
            {...register('city')}
            type="text"
            id="city"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Denver"
          />
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
          Zip code *
        </label>
        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <PatternFormat
              {...field}
              format="#####"
              mask="_"
              placeholder="80202"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        />
        {errors.zipCode && (
          <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          What gym equipment needs repair? *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="My Peloton treadmill won't turn on, error code E01"
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#1B2A4A' }}
      >
        {isSubmitting ? 'Submitting...' : 'Request Service Call'}
      </button>

      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Something went wrong. Please try again or call us directly.
        </div>
      )}
    </form>
  );

  if (variant === 'modal') {
    return formContent;
  }

  return (
    <section id="lead-form" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Request Service Today
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form and we&apos;ll call you back within 15 minutes
            </p>
          </div>
          {formContent}
        </div>
      </div>
    </section>
  );
}
