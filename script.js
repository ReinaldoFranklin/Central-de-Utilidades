"use strict";

// CENTRAL DE UTILIDADES

// Formatar valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Receber e validar números
function lerNumero(mensagem, minimo, inteiro = false) {

    let valor;
    let entrada;

    do {
        entrada = prompt(mensagem);

        if (entrada === null) {
            return null;
        }

        valor = Number(entrada.trim().replace(",", "."));

        if (
            entrada.trim() === "" ||
            !Number.isFinite(valor) ||
            valor < minimo ||
            (inteiro && !Number.isInteger(valor))
        ) {
            alert("Valor inválido! Tente novamente.");
        }

    } while (
        entrada.trim() === "" ||
        !Number.isFinite(valor) ||
        valor < minimo ||
        (inteiro && !Number.isInteger(valor))
    );

    return valor;
}



// 1. CALCULADORA DE DESCONTOS

function calcularDesconto(preco, percentual) {

    const economia = preco * percentual / 100;
    const precoFinal = preco - economia;

    return {
        economia: economia,
        precoFinal: precoFinal
    };
}


function calculadoraDescontos() {

    const preco = lerNumero("Digite o preço original:", 0.01);

    if (preco === null) return;

    const percentual = lerNumero("Digite o percentual de desconto:", 0);

    if (percentual === null) return;

    if (percentual > 100) {
        alert("O desconto não pode ser superior a 100%.");
        return;
    }

    const resultado = calcularDesconto(preco, percentual);

    alert(
        "CALCULADORA DE DESCONTOS\n\n" +
        "Preço original: " + formatarMoeda(preco) +
        "\nDesconto: " + percentual + "%" +
        "\nValor economizado: " + formatarMoeda(resultado.economia) +
        "\nPreço final: " + formatarMoeda(resultado.precoFinal)
    );
}


// 2. CALCULADORA DE PARCELAS


function calcularParcela(valorTotal, quantidade) {

    return valorTotal / quantidade;

}


function calculadoraParcelas() {

    const valorTotal = lerNumero("Digite o valor total da compra:", 0.01);

    if (valorTotal === null) return;

    const quantidade = lerNumero(
        "Digite a quantidade de parcelas:",
        1,
        true
    );

    if (quantidade === null) return;

    const valorParcela = calcularParcela(valorTotal, quantidade);

    alert(
        "CALCULADORA DE PARCELAS\n\n" +
        "Valor total: " + formatarMoeda(valorTotal) +
        "\nQuantidade de parcelas: " + quantidade +
        "\nValor de cada parcela: " + formatarMoeda(valorParcela)
    );
}



// 3. SIMULADOR DE INVESTIMENTOS

function simularInvestimento(inicial, aporte, taxa, meses) {

    let saldo = inicial;

    const totalInvestido = inicial + (aporte * meses);

    for (let mes = 1; mes <= meses; mes++) {

        saldo = saldo + (saldo * taxa / 100);

        saldo = saldo + aporte;

    }

    const rendimento = saldo - totalInvestido;

    return {
        saldoFinal: saldo,
        totalInvestido: totalInvestido,
        rendimento: rendimento
    };
}


function simuladorInvestimentos() {

    const inicial = lerNumero("Digite o investimento inicial:", 0);

    if (inicial === null) return;

    const aporte = lerNumero("Digite o aporte mensal:", 0);

    if (aporte === null) return;

    const taxa = lerNumero("Digite a taxa de rendimento mensal (%):", 0);

    if (taxa === null) return;

    const meses = lerNumero("Digite o período em meses:", 1, true);

    if (meses === null) return;

    const resultado = simularInvestimento(
        inicial,
        aporte,
        taxa,
        meses
    );

    alert(
        "SIMULADOR DE INVESTIMENTOS\n\n" +
        "Saldo final: " + formatarMoeda(resultado.saldoFinal) +
        "\nTotal investido: " + formatarMoeda(resultado.totalInvestido) +
        "\nRendimento obtido: " + formatarMoeda(resultado.rendimento)
    );
}


// 4. DIVISOR DE DESPESAS

function dividirDespesas(total, pessoas) {

    return total / pessoas;

}


function divisorDespesas() {

    let totalDespesas = 0;
    let valorDespesa;
    let cancelado = false;

    do {

        valorDespesa = lerNumero(
            "Digite o valor da despesa (0 para finalizar):",
            0
        );

        if (valorDespesa === null) {

            cancelado = true;

        } else {

            totalDespesas = totalDespesas + valorDespesa;

        }

    } while (valorDespesa !== 0 && !cancelado);

    if (cancelado) return;

    if (totalDespesas === 0) {
        alert("Nenhuma despesa foi informada.");
        return;
    }

    const pessoas = lerNumero(
        "Digite a quantidade de pessoas:",
        1,
        true
    );

    if (pessoas === null) return;

    const valorPorPessoa = dividirDespesas(totalDespesas, pessoas);

    alert(
        "DIVISOR DE DESPESAS\n\n" +
        "Total das despesas: " + formatarMoeda(totalDespesas) +
        "\nQuantidade de pessoas: " + pessoas +
        "\nValor por pessoa: " + formatarMoeda(valorPorPessoa)
    );
}document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-desconto")?.addEventListener("click", calculadoraDescontos);
    document.getElementById("btn-parcelas")?.addEventListener("click", calculadoraParcelas);
    document.getElementById("btn-investimentos")?.addEventListener("click", simuladorInvestimentos);
    document.getElementById("btn-despesas")?.addEventListener("click", divisorDespesas);
});
