import AuthMainLayout from '@/Layouts/AuthMainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ autos, auth, errors }) {
    return (
        <AuthMainLayout
            defaultProps={{
                auth,
                errors,
                header: "Automóveis cadastrados"
            }}
        >
            <Head title="Automóveis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-gray-900">Automóveis cadastrados</div>
                        <div className='py-6 text-gray-900'>
                            {
                                !!autos.length &&
                                autos.map(auto => (
                                    <div key={auto.id}>
                                        {auto.modelo} - {auto.cor} - {auto.ano} - <Link href={`autos.destroy(${auto.id})`}>Remover</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthMainLayout>
    );
}