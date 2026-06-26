// J & F Panaderia Artesanal -- Datos editables
// ==============================================
// IMPORTANTE: guardar siempre como UTF-8 (ver README).
// En Notepad: Archivo > Guardar como > Codificacion: UTF-8
// Despues de guardar, refresca con Ctrl+F5.

window.__JYF__ = {

  brand: {
    nombre:     'J & F',
    eslogan:    'la masa de toda la vida.',
    direccion:  'Calle Las Heras 742, Mendoza Capital',
    referencia: 'cerca de Plaza Independencia',
    telefono:   '+54 9 261 344-2368',
    whatsapp:   '5492613442368',
    instagram:  '@Caseritos.mza',
    igUrl:      'https://www.instagram.com/Caseritos.mza',
    apertura:   '1998',
    tagline:    'EST. 1998 - MZA',
  },

  horario: {
    semana:  'Lunes a Sabado - 07:00 a 21:00',
    domingo: 'Domingos - 08:00 a 13:00',
  },

  productos: [
    { id:'pan-casero',       nombre:'Pan Casero',           serie:'Clasico',   subtitulo:'El de toda la vida',         ingredientes:['Harina','Masa madre','Sal de mar'],             descripcion:'Corteza crocante y migajon tibio. El pan que abrio este local en el noventa y ocho y nunca cambio de receta.', colorFill:'#C68642', colorAccent:'#C1502E' },
    { id:'factura-manteca',  nombre:'Factura de Manteca',   serie:'Clasico',   subtitulo:'La favorita de la vidriera', ingredientes:['Manteca','Harina','Almibar'],                   descripcion:'Hojaldrada, dulce justa, recien salida del horno cada manana. La que mas se pide para el mate.',               colorFill:'#F2C879', colorAccent:'#E8A33D' },
    { id:'torta-cumpleanos', nombre:'Torta de Cumpleanos',  serie:'Clasico',   subtitulo:'Para festejar en casa',      ingredientes:['Bizcochuelo','Dulce de leche','Crema'],         descripcion:'La de siempre, con dulce de leche bien generoso. Se encarga con un dia de aviso.',                              colorFill:'#F7E7C6', colorAccent:'#C1502E' },
    { id:'pan-dulce',        nombre:'Pan Dulce',             serie:'Clasico',   subtitulo:'El de las fiestas',          ingredientes:['Frutas confitadas','Pasas','Nueces'],           descripcion:'Receta de familia, esponjoso y con la fruta justa. Se vende todo diciembre y se agota rapido.',                 colorFill:'#B8835C', colorAccent:'#E8A33D' },
    { id:'chipa',            nombre:'Chipa',                 serie:'Temporada', subtitulo:'El antojo correntino',       ingredientes:['Almidon de mandioca','Queso','Huevo'],          descripcion:'Crocante afuera, elastico adentro. Se hornea por tandas chicas para que llegue siempre caliente.',              colorFill:'#EAC15A', colorAccent:'#5B6B45' },
    { id:'empanada-carne',   nombre:'Empanada de Carne',     serie:'Temporada', subtitulo:'Para el mediodia',           ingredientes:['Carne cortada a cuchillo','Cebolla','Huevo'],   descripcion:'Repulgo a mano, jugo justo, horno fuerte. Se piden por docena para llevar a la oficina.',                       colorFill:'#D99A4E', colorAccent:'#C1502E' },
    { id:'rogel',            nombre:'Rogel',                 serie:'Temporada', subtitulo:'El postre de domingo',       ingredientes:['Masa hojaldrada','Dulce de leche','Merengue'],  descripcion:'Capas finitas y dulce de leche entre cada una. Se vende por porcion o entero para la sobremesa.',               colorFill:'#E8C98A', colorAccent:'#E8A33D' },
    { id:'pan-salvado',      nombre:'Pan de Salvado',        serie:'Temporada', subtitulo:'El de todos los dias',       ingredientes:['Harina integral','Salvado','Semillas'],         descripcion:'Para la dieta de toda la semana, sin perder sabor. El que mas piden los habituos del barrio.',                  colorFill:'#9C6F44', colorAccent:'#5B6B45' },
    { id:'vigilante',        nombre:'Vigilante',             serie:'Temporada', subtitulo:'Membrillo y queso',          ingredientes:['Masa quebrada','Dulce de membrillo','Queso'],   descripcion:'El clasico de panaderia argentina. Dulce y salado en el mismo bocado, tibio recien horneado.',                  colorFill:'#B5482E', colorAccent:'#C1502E' },
    { id:'bizcochos-grasa',  nombre:'Bizcochos de Grasa',    serie:'Temporada', subtitulo:'Los de la abuela',           ingredientes:['Grasa vacuna','Harina','Sal gruesa'],           descripcion:'Crocantes, hojaldrados y con el toque de sal justo. Se venden por bolsa, no duran ni un dia en casa.',         colorFill:'#DDB877', colorAccent:'#E8A33D' },
  ],

  produccion: [
    { dias:'Lunes a miercoles', producto:'Pan y facturas del dia',         detalle:'Lo de siempre, fresco cada manana.',     icono:'horno',    acento:'#C1502E' },
    { dias:'Jueves y viernes',  producto:'Tortas por encargo',              detalle:'Avisa con un dia y la retiras lista.',   icono:'torta',    acento:'#E8A33D' },
    { dias:'Sabado',            producto:'Empanadas por docena',            detalle:'Para la mesa del fin de semana.',        icono:'empanada', acento:'#5B6B45' },
    { dias:'Domingo',           producto:'Pan dulce y facturas especiales', detalle:'Horario reducido, produccion limitada.', icono:'trigo',    acento:'#C1502E' },
  ],

  gallery: [
    { lane:1, file:'gallery-01.jpg', alt:'Panes artesanales' },
    { lane:1, file:'gallery-04.jpg', alt:'Facturas en vidriera' },
    { lane:1, file:'gallery-07.jpg', alt:'Harina en mesada' },
    { lane:1, file:'gallery-12.jpg', alt:'Corteza de pan' },
    { lane:1, file:'gallery-13.jpg', alt:'Medialunas de manteca' },
    { lane:2, file:'gallery-02.jpg', alt:'Manos amasando' },
    { lane:2, file:'gallery-05.jpg', alt:'Granos de trigo' },
    { lane:2, file:'gallery-08.jpg', alt:'Pan fresco en rejilla' },
    { lane:2, file:'gallery-14.jpg', alt:'Panadero con delantal' },
    { lane:2, file:'gallery-15.jpg', alt:'Masa madre' },
    { lane:3, file:'gallery-03.jpg', alt:'Horno a lena' },
    { lane:3, file:'gallery-06.jpg', alt:'Vidriera de panaderia' },
    { lane:3, file:'gallery-09.jpg', alt:'Torta de cumpleanos' },
    { lane:3, file:'gallery-10.jpg', alt:'Masa levando' },
    { lane:3, file:'gallery-11.jpg', alt:'Empanadas en bandeja' },
    { lane:3, file:'gallery-16.jpg', alt:'Interior de panaderia' },
  ],
};
