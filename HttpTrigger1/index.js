module.exports = async function (context, req) {
    let document = `This is a long text that`
        + ` is going to be multiplied multiple times.`
    for (let i = 0; i < 13; i++) {
        // it is necessary to create a new copy,
        // otherwise js optimizes with references
        document = JSON.stringify(document + document)
    }

    let documents = [document, document]
    for (let i = 0; i < 1; i++) {
        documents = [...JSON.parse(JSON.stringify(documents)), ...JSON.parse(JSON.stringify(documents))]
    }

    context.res = {
        body: 'Generated and sorted a list'
    };
}
