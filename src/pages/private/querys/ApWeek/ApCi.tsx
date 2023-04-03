import React from 'react'
import { AccountEvent } from '../../../../models/account-event.model';

interface Props {
  date: string;
  account: AccountEvent;
}
export const ApCi = ({date, account}:Props) => {
  return (
    <>
      <>
        <td key={`${account.CodigoCte}-${date}-OPEN`}>
          {
            account.eventos?.find(ev => ev.FechaOriginal === date && ['O', 'OS'].includes(ev.CodigoAlarma))?.Hora.substring(0, 5) || '--:--'
          }
        </td>
        <td key={`${account.CodigoCte}-${date}-CLOSE`}>
          {
            account.eventos
              ?
              (account.eventos?.filter(ev => ev.FechaOriginal === date).length === 0)
                ?
                '--:--'
                :
                ['C', 'CS'].includes(account.eventos!.filter(ev => ev.FechaOriginal === date)[account.eventos!.filter(ev => ev.FechaOriginal === date).length - 1].CodigoAlarma)
                  ?
                  account.eventos!.filter(ev => ev.FechaOriginal === date)[account.eventos!.filter(ev => ev.FechaOriginal === date).length - 1].Hora.substring(0, 5)
                  :
                  '--:--'
              :
              '--:--'
          }
        </td>
      </>
    </>
  )
}
