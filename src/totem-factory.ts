import { TotemCreated as TotemCreatedEvent } from "../generated/TotemFactory/TotemFactory"
import { TotemCreated } from "../generated/schema"

export function handleTotemCreated(event: TotemCreatedEvent): void {
  // Создаем уникальный ID для события
  let id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  let entity = new TotemCreated(id)
  
  // Заполняем поля сущности данными из события
  entity.totemAddr = event.params.totemAddr
  entity.totemTokenAddr = event.params.totemTokenAddr
  entity.totemId = event.params.totemId
  entity.creator = event.transaction.from
  
  // Добавляем информацию о блоке и транзакции
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  
  // Сохраняем сущность
  entity.save()
}
