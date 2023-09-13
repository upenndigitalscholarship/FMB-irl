const parquet = require('parquetjs');
module.exports = {
    makeData: async function (schema, parquetFile) {
        let writer = await parquet.ParquetWriter.openFile(schema, parquetFile);
        console.log(writer)
        writer.appendRow({
            name: 'apples',
            quantity: 10,
            price: 2.6,
            date: new Date(),
            in_stock: true
        });
        writer.close();
    },
    bar: function () {
      // whatever
    }
  };
  
  var zemba = function () {
  }
  