import React, { FunctionComponent, useEffect, useState } from 'react'
import Cascader, {
  CascaderProps,
  CascaderOption,
  CascaderValue,
  CascaderOptionKey,
} from '@/packages/cascader/index'
import { ComponentDefaults } from '@/utils/typings'
import Popup from '@/packages/popup'
import Grid from '@/packages/grid'
import './address.scss'

export interface AddressProps extends CascaderProps {
  visible: boolean // popup 显示状态
  type: string
  options: CascaderOption[]
  value?: CascaderValue
  defaultValue?: CascaderValue
  optionKey: CascaderOptionKey
  format: Record<string, string | number | null>
  height: string | number
  hotCity?: {
    title: string
    list: Array<HotCity>
  }
}

export interface HotCity {
  text: string
  value: Array<string | number>
  checked: boolean
}

const defaultProps = {
  ...ComponentDefaults,
  visible: false,
  type: 'custom',
  options: [],
  optionKey: { textKey: 'text', valueKey: 'value', childrenKey: 'children' },
  format: {},
  height: '200px',
} as unknown as AddressProps

export const CustomRender: FunctionComponent<
  Partial<AddressProps> &
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'title' | 'defaultValue' | 'onChange'
    >
> = (props) => {
  const {
    children,
    visible,
    type,
    height,
    options,
    title,
    left,
    value,
    defaultValue,
    optionKey,
    format,
    onClose,
    onChange,
    onPathChange,
    hotCity,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const classPrefix = 'nut-address'

  const [value1, setValue1] = useState(defaultValue)
  const onGridClick = (item: any, index: number) => {
    // Toast.show(`点击了${item.text}，第${index}个`)
    const value = hotCity?.list[index].value
    setValue1(value)
  }
  useEffect(() => {
    console.log('改变值', value1)
  }, [value1])
  return (
    <>
      {type === 'custom' && (
        <Popup
          visible={visible}
          position="bottom"
          style={{ height: '80%' }}
          round
          closeable
          title={title}
          left={left}
          onClose={() => {
            onClose?.()
          }}
        >
          <div className={`${classPrefix}-common-title`}>{hotCity?.title}</div>
          <Grid columns={4} onClick={onGridClick}>
            {hotCity?.list.map((item: any, idex: number) => {
              return <Grid.Item text={item.text} key={idex} />
            })}
          </Grid>
          <Cascader
            value={value1}
            defaultValue={value1}
            options={options}
            format={format}
            optionKey={optionKey}
            onChange={(val) => {
              onChange?.(val)
            }}
            onPathChange={onPathChange}
            {...rest}
          />
        </Popup>
      )}
    </>
  )
}
