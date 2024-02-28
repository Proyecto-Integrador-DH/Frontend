import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fecthListarProductos } from '../../services/api'

const ListProducts = () => {

	const [productos, setProducts] = useState([]);


	useEffect(() => {
		fecthListarProductos()
			.then(data => {
				setProducts(data)
				console.log(data);
			})
			.catch(error => {
				console.error(errorHandling(error));
			});
	});

 return (
	  <div>
		<h2>Lista de Productos</h2>
		<ul>
		  {productos.map(producto => (
			<li key={producto.id}>
			  {producto.nombre} - {producto.id}
			</li>
		  ))}
		</ul>
	  </div>
	);
}

export default ListProducts