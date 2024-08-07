import { dest, watch, src, series } from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);


//FUNCION PARA LEER LOS CAMBIOS DE EL ARCHIVO APP DE SCSS Y PASARLOS A LA CARPETA DIST.
export function css ( done ) {
    src( 'src/scss/app.scss', {sourcemaps: true} )
    .pipe(sass().on('error', sass.logError))
    .pipe( dest( 'dist/css', {sourcemaps: true} ) ); //todo este es una sola linea de codigo pero con saltos de linea.
    done();
}

//FUNCION PARA LEER LOS CAMBIOS DE EL ARCHIVO APP DE JS Y PASARLOS A LA CARPETA DIST.
export function js ( done ) {
    src( 'src/js/app.js' ).pipe( dest( 'dist/js' ) );
    done();
}

//FUNCTION PARA RENDERIZAR LAS CARPETAS DE SCSS Y JS PARA PASARLAS A CODIGO CSS Y JS PERO CON MENOS PESO.
export function render(){
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/js/**/*.js', js );
}

//EJECUTA LAS FUNCTIONES EN FORMA DE SERIE
export default series( js, css, render )