import { Suspense } from 'react';
import { PackageOrderConfirmed } from '@/components/pages/package-order-confirmed/package-order-confirmed';

export const metadata = {
  title: 'ClanConnect - Order Confirmed',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PackageOrderConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <PackageOrderConfirmed />
    </Suspense>
  );
}
