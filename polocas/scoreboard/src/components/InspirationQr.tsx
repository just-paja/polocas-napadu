import { gql } from '@apollo/client'
import { withQuery } from '@polocas/ui/apollo'

const GET_MATCH_INSPIRATION_QR = gql`
  query ($matchId: Int!) {
    match(id: $matchId) {
      show {
        inspirationQrUrl
      }
    }
  }
`

export const InspirationQr = withQuery(
  ({ data, ...props }) => (
    <img src={data.match.show.inspirationQrUrl} alt="invite" {...props} />
  ),
  GET_MATCH_INSPIRATION_QR
)
