import React, {
  ForwardRefRenderFunction,
  PropsWithChildren,
  useImperativeHandle,
} from 'react'
import './areacode.scss'
import { useConfig } from '@/packages/configprovider'
import Popup from '@/packages/popup'
import { CascaderProps } from '@/packages/cascader/index'
import Radio from '@/packages/radio'
import Elevator from '@/packages/elevator'
import { usePropsValue } from '@/utils/use-props-value'

export interface AreaCodeProps extends CascaderProps {
  visible: boolean
  defaultVisible: boolean
  dataList: Array<object>
  titleAreaCodes: string
  commonList: Array<CommonListValue>
  onSelect: (val: any) => void
}
interface CommonListValue {
  code: string
  value: string
  label: string
}

export type AreaCodeActions = {
  open: () => void
  close: () => void
}

const defaultProps = {} as AreaCodeProps

const InternalAreaCode: ForwardRefRenderFunction<
  unknown,
  PropsWithChildren<Partial<AreaCodeProps>>
> = (props, ref) => {
  const { locale } = useConfig()
  const {
    visible,
    closeIcon,
    title,
    titleAreaCodes,
    commonList,
    dataList,
    className,
    style,
    onClose,
    onSelect,
  } = {
    ...defaultProps,
    ...props,
  }
  const classPrefix = 'nut-areacode'
  const classElevator = 'nut-elevator-list-item-name-highcolor'
  const [innerVisible, setInnerVisible] = usePropsValue<boolean>({
    value: visible,
  })
  const actions: AreaCodeActions = {
    open: () => {
      setInnerVisible(true)
    },
    close: () => {
      setInnerVisible(false)
    },
  }
  useImperativeHandle(ref, () => actions)
  /** 区号列表选中 */
  const onItemClick = (key: string, item: any) => {
    console.log(key, JSON.stringify(item))
    onSelect && onSelect(item)
    setInnerVisible(false)
    onClose && onClose()
  }
  /** 区号列表的索引点击事件 */
  const onIndexClick = (key: string) => {
    console.log(key)
  }
  const handleClose = () => {
    setInnerVisible(false)
    onClose && onClose()
  }
  /** 常用区号切换选择函数 */
  const handleChange = (v: string | number) => {
    onSelect && onSelect(v)
    setInnerVisible(false)
    onClose && onClose()
  }
  return (
    <>
      <Popup
        visible={innerVisible}
        position="bottom"
        style={{ height: '80%' }}
        round
        closeable
        closeIcon={closeIcon}
        title={title || locale.address.selectRegion}
        onClose={handleClose}
      >
        <div
          className={`${classPrefix} ${className || ''}`}
          style={{ ...style }}
        >
          {
            // 不需要 close，选中切换即关闭弹框。可手动关闭弹框，只关闭弹框不处理逻辑。
            <>
              <div className={`${classPrefix}-common-title`}>
                {titleAreaCodes}
              </div>
              <Radio.Group
                style={{ '--nutui-radio-button-padding': '5px 5px' }}
                value="1"
                options={commonList}
                shape="button"
                direction="horizontal"
                onChange={(value) => handleChange(value)}
              />
              <div style={{ background: 'white', marginTop: '10px' }}>
                <Elevator
                  list={dataList}
                  className={classElevator}
                  sticky
                  height="320"
                  onItemClick={(key: string, item: any) =>
                    onItemClick(key, item)
                  }
                  onIndexClick={(key: string) => onIndexClick(key)}
                />
              </div>
            </>
          }
        </div>
      </Popup>
    </>
  )
}

export const AreaCode = React.forwardRef(InternalAreaCode)

AreaCode.defaultProps = defaultProps
AreaCode.displayName = 'NutAreaCode'
