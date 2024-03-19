import React, { useState } from 'react'
import { useTranslate } from '../../sites/assets/locale'
import { AreaCode } from './areacode'
import { Cell } from '@/packages/cell/cell'

interface T {
  basic: string
  title: string
  areacodeTip: string
  areacodeTip1: string
}

const AreaCodeDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      basic: '基础用法',
      title: '电话区号',
      areacodeTip: '选择电话区号',
      areacodeTip1: '请选择想要的国际区号',
    },
    'zh-TW': {
      basic: '基础用法',
      title: '電話區號',
      areacodeTip: '選擇電話區號',
      areacodeTip1: '請選擇想要的國際區號',
    },
    'en-US': {
      basic: 'Basic Usage',
      title: 'AreaCode',
      areacodeTip: 'Select areacode',
      areacodeTip1: 'Please select an areacode',
    },
  })
  const dataList1 = [
    {
      title: 'A',
      list: [
        {
          name: '阿尔巴尼亚 +0355',
          value: '+0355',
          code: '1',
          id: 1,
        },
      ],
    },
    {
      title: 'B',
      list: [
        {
          name: '布隆迪 +0257',
          value: '+0257',
          code: '2',
          id: 2,
        },
      ],
    },
    {
      title: 'C',
      list: [
        {
          name: '赤道几内亚 +0240',
          value: '+0240',
          code: '3',
          id: 3,
        },
      ],
    },
    {
      title: 'F',
      list: [
        {
          name: '法国 +0033',
          value: '+0033',
          code: '4',
          id: 4,
        },
      ],
    },
    {
      title: 'G',
      list: [
        {
          name: '冈比亚 +0220',
          value: '+0220',
          code: '5',
          id: 5,
        },
        {
          name: '刚果金 +0242',
          value: '+0242',
          code: '6',
          id: 6,
        },
        {
          name: '哥伦比亚 +0057',
          value: '+0057',
          code: '7',
          id: 7,
        },
        {
          name: '格林纳达 +1473',
          value: '+1473',
          code: '8',
          id: 8,
        },
      ],
    },
    {
      title: 'L',
      list: [
        {
          name: '老挝 +0856',
          value: '+0856',
          code: '9',
          id: 9,
        },
      ],
    },
  ]
  const commonList = [
    {
      code: '1',
      value: '+86',
      label: '中国大陆 +86',
    },
    {
      code: '2',
      value: '+852',
      label: '中国香港 +852',
    },
    {
      code: '3',
      value: '+0853',
      label: '中国澳门 +0853',
    },
    {
      code: '4',
      value: '+886',
      label: '中国台湾 +886',
    },
  ]
  const [text, setText] = useState<any>({
    desc1: translated.areacodeTip1,
  })
  const [isVisibleDemo1, setIsVisibleDemo1] = useState(false)
  return (
    <>
      <div className="demo">
        <h2>{translated.basic}</h2>
        <Cell
          title={translated.areacodeTip}
          description={text.desc1}
          onClick={() => {
            setIsVisibleDemo1(true)
          }}
        />
        <AreaCode
          visible={isVisibleDemo1}
          title={translated.title}
          dataList={dataList1}
          titleAreaCodes="常用区号"
          commonList={commonList}
          onClose={() => {
            setIsVisibleDemo1(false)
          }}
          onSelect={(val: any) => {
            console.log(val)
            setText({
              desc1: typeof val === 'string' ? val : val.value,
            })
          }}
        />
      </div>
    </>
  )
}

export default AreaCodeDemo
