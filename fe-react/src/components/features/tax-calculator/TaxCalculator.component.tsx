import { MLProductCommission } from "../../../models/dto/ProductApiResponse.model"
import { currencyFormatter } from "../../../utils/LocaleFormatter.util"

export default function TaxCalculator({
  commissions,
  price,
}: {
  commissions: MLProductCommission
  price: number
}) {
  return (
    <>
      <div className="group-info">
        <h3>Preço descontando taxa</h3>
        <em>
          Preço aproximado, taxa fixa de{" "}
          {commissions.fixedCommissionPrice * 100}%
        </em>
      </div>
      <p>Preço anúncio: {currencyFormatter(price, true)}</p>
      <p>
        Taxas: <i>{currencyFormatter(commissions.totalCommission, true)}</i>
      </p>
      <p>
        Lucro bruto:
        <strong>{currencyFormatter(commissions.grossProfit, true)}</strong>
      </p>
    </>
  )
}
