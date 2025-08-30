import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  readonly nombre: string;

  @IsString()
  readonly descripcion: string;

  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  readonly precio: number;

  @IsNumber()
  readonly stock: number;
}