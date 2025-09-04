let operaciones = []; 
const expresionPostfija = []
let expresionInfija = [];
let resultadofinal=[];
let yaCalcule = false;

//debemos de crear la funcion
function agregarNumero(numero) {
    operaciones.push(numero);
    numero  += operaciones;
    console.log(operaciones);
    document.getElementById("display").innerText = operaciones.join(" "); // Convertir el arreglo a cadena para mostrar en el display
    console.log(yaCalcule);
    
    
}




function borrar() {
    operaciones.pop();
    console.log(operaciones);
    document.getElementById("display").innerText = operaciones;
    document.getElementById("display").innerText = operaciones.join(""); // Convertir el arreglo a cadena para mostrar en el display

    if(operaciones.length === 0){
        document.getElementById("display").innerText = '0';
    }
    
}

function borrarTodo(arreglo){
    //investigue la forma mas eficiente de borrar todo en un arreglo es asi
    arreglo.length = 0; 
   
}




function obtenerInfija() {
    let expresionArray = operaciones;
    console.log("expresion a hacer infija " + expresionArray);
    let numero = "";

    for (let i = 0; i < expresionArray.length; i++) {
        let token = expresionArray[i];

        if (!isNaN(token)) {
            // si es dígito, lo acumulamos
            numero += token;
        } else {
            // si encontramos un operador, primero guardamos el número acumulado
            if (numero !== "") {
                expresionInfija.push(numero);
                numero = "";
            }
            // luego guardamos el operador
            expresionInfija.push(token);
        }

    }

    // eliminar operador final si existe
    //para saber el ultimo elemento del array es length -1

   
    
    
    // agregar último número si quedó pendiente
    if (numero !== "") {
        expresionInfija.push(numero);
    }

    if(isNaN(expresionInfija[expresionInfija.length-1])){
        expresionInfija.pop();
        console.log("expresion array despues de pop " + expresionInfija);
    }
    console.log("ultimo elemento del array " + expresionInfija[expresionInfija.length -1]);
    console.log("Expresión en notación infija:", expresionInfija);
    
    console.log("expresion array " + expresionArray);
    borrarTodo(expresionArray);
    
}

function infijaAPostfija() {
    let expresion = expresionInfija;

    const pila = []; // pila temporal para operadores 
    const operadores = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    let numero = ""; // para acumular dígitos de números grandes

    // recorrer la expresión infija token por token 
    for (let i = 0; i < expresion.length; i++) {
        const token = expresion[i];

        if (!isNaN(token)) {
            // si es dígito, lo añadimos al número temporal
            numero += token;
        } else {
            // si encontramos un operador, primero guardamos el número acumulado en postfija final y limpiamos
            if (numero !== "") {
                expresionPostfija.push(numero);
                numero = "";
            }

            // ahora procesamos el operador
            if (operadores[token]) {
                // mientras haya operadores en la pila con mayor o igual precedencia, los sacamos a postfija, luego ponemos el nuevo operador en la pila
                
                while (pila.length > 0 && operadores[pila[pila.length - 1]] >= operadores[token]) {
                    expresionPostfija.push(pila.pop());
                }
                pila.push(token);
            }
        }
    }

    // agregar último número si quedó pendiente
    if (numero !== "") {
        expresionPostfija.push(numero);
    }

    // vaciar la pila
    while (pila.length > 0) {
        expresionPostfija.push(pila.pop());
    }

    console.log("Expresión en notación postfija:", expresionPostfija);

}

function calcularPostfija() {
    obtenerInfija();
    infijaAPostfija();
    
    let pilaCalculo = [];
    let op1, op2;
    let resultadoOperaciones = 0;
    

    for(let i = 0; i < expresionPostfija.length; i++) {
        
        //si no es un numero entonces es un operador, y lo metemos a la pila 
        if(isNaN(expresionPostfija[i])) {
            op2 = pilaCalculo.pop(); // Sacar el último número ingresado (el segundo operando)
            op1 = pilaCalculo.pop(); // Sacar el penúltimo número ingresado
            
            console.log("Operador:", expresionPostfija[i]);
            switch(expresionPostfija[i]) {
                case '+':        
                    resultadoOperaciones = op1 + op2;
                    break;
                case '-':
                    resultadoOperaciones = op1 - op2;
                    break;
                case '*':   
                    resultadoOperaciones = op1 * op2;
                    break;
                case '/':
                    resultadoOperaciones = op1 / op2;
                    break;
            }
            pilaCalculo.push(resultadoOperaciones); // Poner el resultado de vuelta en la pila
            console.log("Pila después de operar:", pilaCalculo);
        }else {
            pilaCalculo.push(parseFloat(expresionPostfija[i])); // Convertir a número y agregar a la pila
            console.log("Pila después de agregar número:", pilaCalculo);
        }
      ;
    }

    
    resultadofinal = pilaCalculo.pop(); // El resultado final es el único número que queda en la pila
    console.log("Resultado final:", resultadofinal);
    yaCalcule = true;
    borrarTodo(pilaCalculo);
    borrarTodo(operaciones);
    borrarTodo(expresionInfija);
    operaciones.push(resultadofinal);
    console.log(operaciones)
    document.getElementById("display").innerText = resultadofinal;
}






    
    //document.getElementById("display").innerText = resultadofinal;
//}