const { jsPDF } = require('jspdf')

const contractGenerator = ({
  landlordName = 'Alex',
  renterName = 'Adam'
}) => {
  const text = `
    Договор аренды №______
    движимого имущества
    «__»__________20___г.
    Настоящий договор заключается посредством использования сервиса SOUGHT STUFF (далее - Сервис), расположенного в сети Интернет на условиях Соглашения, принятого следующими Сторонами договора:
    Арендатель: ${renterName}
    Арендодатель: ${landlordName}
  `

  const doc = new jsPDF();

  doc.text(text, 10, 10);
  doc.save("a4.pdf");

  return doc
}

module.exports = contractGenerator
