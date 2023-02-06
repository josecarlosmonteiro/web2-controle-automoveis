import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AuthMainLayout({ defaultProps, children }) {
  return (
    <main>
      <AuthenticatedLayout {...defaultProps}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{defaultProps.header}</h2>}>
        <Head title={defaultProps.header} />

        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </main >
  )
}