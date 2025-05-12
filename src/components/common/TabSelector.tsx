import { ViewType } from "@components/record/type";
import * as S from "./TabSelector.styles";

export interface TabOption {
  label: string;
  value: ViewType;
}

interface TabSelectorProps {
  options: TabOption[];
  activeValue: ViewType;
  onChange: (value: ViewType) => void;
}

const TabSelector = ({ options, activeValue, onChange }: TabSelectorProps) => {
  return (
    <S.TabWrapper>
      {options.map(({ label, value }) => (
        <S.TabButton
          key={value}
          active={value === activeValue}
          onClick={() => onChange(value)}
        >
          {label}
        </S.TabButton>
      ))}
    </S.TabWrapper>
  );
};

export default TabSelector;
