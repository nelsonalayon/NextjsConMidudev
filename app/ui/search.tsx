'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
// use useDebounce es un hook que nos permite retrasar la ejecucion de una funcion, en este caso, la funcion handleSearch, que se ejecuta cada vez que el usuario ingresa algo en el input de busqueda. El primer parametro es la funcion que se ejecutara, el segundo parametro es el tiempo que se retrasara la ejecucion de la funcion, en este caso 300 milisegundos.
import { useDebouncedCallback } from 'use-debounce'

const WAIT = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  
  const handleSearch = useDebouncedCallback( (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    params.set('page', '1');

    // la funcion replace actualiza la url sin recargar la pagina, en este caso conservamos mediante pathname la Raiz y agregamos con un ? los parametros de busqueda

    replace(`${pathName}?${params.toString()}`)
  }, WAIT);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label> 
      {/* como la url se actualiza en tiempo real cada vez que el usuario ingresa algo en el input, la url actualizada deberia llevar a la pagina con el input lleno con la solicitud, para ello en defaultValue usamos searchParams.get para traer la url con el query. En caso de que no haya ningun query, el input se mostrara vacio     */}
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString() || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
