// src/productos/productos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  // Simulación de una base de datos con un array
  private productos: Producto[] = [
    { id: 1, nombre: 'Laptop Gamer', descripcion: 'Potente laptop para juegos', precio: 1500, stock: 10 },
    { id: 2, nombre: 'Teclado Mecánico', descripcion: 'Teclado con switches Cherry MX', precio: 120, stock: 50 },
  ];
  private currentId = 3; // Para simular el autoincremento del ID

  create(createProductoDto: CreateProductoDto): Producto {
    const nuevoProducto: Producto = {
      id: this.currentId++,
      ...createProductoDto,
    };
    this.productos.push(nuevoProducto);
    return nuevoProducto;
  }

  findAll(): Producto[] {
    return this.productos;
  }

  findOne(id: number): Producto {
    const producto = this.productos.find(p => p.id === id);
    if (!producto) {
      throw new NotFoundException(`El producto con el ID #${id} no fue encontrado.`);
    }
    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto): Producto {
    const producto = this.findOne(id); // Reutilizamos findOne para manejar el error
    const productoIndex = this.productos.findIndex(p => p.id === id);
    
    const productoActualizado = { ...producto, ...updateProductoDto };
    this.productos[productoIndex] = productoActualizado;
    
    return productoActualizado;
  }

  remove(id: number): { message: string } {
    const producto = this.findOne(id); // Reutilizamos para verificar si existe
    this.productos = this.productos.filter(p => p.id !== id);
    return { message: `Producto con ID #${id} eliminado correctamente.` };
  }
}