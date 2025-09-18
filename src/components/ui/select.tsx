import {
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectIndicatorGroup,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from "@chakra-ui/react/select"
import {createListCollection, ListCollection, Portal} from "@chakra-ui/react";
import {SelectOption, Size, SelectVariant} from "@/types/chakraui";

interface SelectProps {
  id?: string,
  label?: string,
  placeholder?: string,
  items: SelectOption[],
  grouped?: boolean,
  groups: string[],
  value: string | string[],
  onValueChange: (value: string | string[]) => void,
  size?: Size,
  variant?: SelectVariant,
}

export default function Select({
  id,
  label,
  placeholder = "Selecione...",
  items = [],
  grouped = false,
  groups,
  value,
  onValueChange,
  size = "md",
  variant = "subtle"
}: SelectProps) {

  const multiselect = Array.isArray(value);

  const collection = createListCollection({
    items: items
  })

  return (
    <SelectRoot
      id={id}
      collection={collection}
      value={multiselect ? value : [value]}
      onValueChange={(e) => onValueChange(multiselect ? e.value : e.value[0])}
      size={size}
      variant={variant}
    >
      <SelectHiddenSelect />
      {label && <SelectLabel>{label}</SelectLabel>}

      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectIndicatorGroup>
          <SelectIndicator />
          <SelectClearTrigger />
        </SelectIndicatorGroup>
      </SelectControl>

      <Portal>
        <SelectPositioner>
          <SelectContent>

            {grouped ?
              <Items
                collection={collection}
              /> :
              <GroupedItems
                collection={collection}
                groups={groups}
              />
            }

          </SelectContent>
        </SelectPositioner>
      </Portal>
    </SelectRoot>
  )
}

const Items = ({
  collection
} : {
  collection: ListCollection<SelectOption>
}) => {

  return <>
    {collection.items.map((item, index) => {
      return (
        <SelectItem
          item={index}
          key={item.value}
        >
          {item.label}
          <SelectItemIndicator />
        </SelectItem>
      )
    })}
  </>
}

const GroupedItems = ({
  collection,
  groups
} : {
  collection: ListCollection<SelectOption>,
  groups: string[]
}) => {

  return <>
    {groups.map((group, index) => {

      return (
        <SelectItemGroup key={index}>
          <SelectItemGroupLabel>{group}</SelectItemGroupLabel>

          {collection.items.map((item) => {
            if (item.group !== group) return;

            return (
              <SelectItem item={item} key={item.value}>
                {item.label}
                <SelectItemIndicator />
              </SelectItem>
            )
          })}

        </SelectItemGroup>
      )
    })}
  </>
}