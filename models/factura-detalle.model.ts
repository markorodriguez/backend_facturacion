export default interface IFacturaDetalle {
    id_detallefactura: number;
    id_detalleproducto: number;
    id_cliente: number;
    id_usuario: number;
    fecha: string;
    tiempoejecucion: number;
    importetotal: number;
    estado: string;
    igv: number;
}