import React, { useState, useEffect }from 'react'
import { fetchCategorias } from '../../services/api';

const AsignarCategoria = () => {
    const [categorias, setCategoria] = useState([]);


	useEffect(() => {

		fetchCategorias()
			.then(data => {
				setCategoria(data)
				console.log(data);
			})
			.catch(error => {
				console.error(errorHandling(error));
			});
	}, []);


	return (
		<div>
			<h2>Lista de categorias</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre de la experiencia</th>
					</tr>
				</thead>
				<tbody>
					{categorias.map(categoria => (
						<tr key={categoria.id}>
							<td>{categoria.id}</td>
							<td>{categoria.nombre}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AsignarCategoria