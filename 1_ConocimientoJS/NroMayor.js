let numeros = [3, 30, 34, 5, 9];

function numeroMasGrande(numeros) {

    numeros.sort((a, b) => {
        return (b + '' + a) - (a + '' + b);
    })

    return Number(numeros.join(''))
}

const resultado = numeroMasGrande(numeros);
console.log(resultado); 