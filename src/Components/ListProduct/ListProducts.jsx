import React, { useState, useEffect } from 'react';
import { fetchListarProductos } from '../../services/api';
import style from './ListProducts.module.css'

const ListProducts = () => {

	const [productos, setProducts] = useState([]);


	useEffect(() => {

		fetchListarProductos()
			.then(data => {
				setProducts(data)
				console.log(data);
			})
			.catch(error => {
				console.error(errorHandling(error));
			});
	}, []);


	return (
		<div>
			<h2>Lista de Productos</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre del Producto</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{productos.map(producto => (
						<tr key={producto.id}>
							<td>{producto.id}</td>
							<td>{producto.nombre}</td>
							<td>
								<button className={style.button} onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
								<button className={style.button} onClick={() => handleAsignarCategoria(producto.id)}>Asignar Categoria</button>

							</td>

							
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ListProducts