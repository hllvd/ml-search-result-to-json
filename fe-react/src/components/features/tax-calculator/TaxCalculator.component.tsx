import { currencyFormatter } from "../../../utils/LocaleFormater.util"

export default function TaxCalculator({ price }: { price: number }) {
  console.log(price)
  if (price == null) {
    return <></>
  }
  const calculateMeliFinalPrice = (price: number) => {
    const taxes = calculateMeliTaxes(price)
    return currencyFormatter(price - taxes, true)
  }
  const calculateMeliTaxes = (price: number) => {
    const fixedTax = price < 70 ? 6 : 0
    const tax = 0.12 * price
    return tax + fixedTax
  }
  return (
    <>
      <div className="group-info">
        <h3>Preço descontando taxa</h3>
        <em>Preço aproximado, taxa fixa de 6%</em>
      </div>
      <p>Preço anúncio: {currencyFormatter(price, true)}</p>
      <p>
        Taxas: <i>{currencyFormatter(calculateMeliTaxes(price), true)}</i>
      </p>
      <p>
        Preço sem taxas: <strong>{calculateMeliFinalPrice(price)}</strong>
      </p>
    </>
  )
}
