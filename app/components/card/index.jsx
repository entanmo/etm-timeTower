import React from 'react'
import './style/index.less'
import { Radio } from 'antd';
import intl from 'react-intl-universal';

const RadioGroup = Radio.Group;
class Card extends React.Component{
  constructor(){
    super()
  }

  onChange = (e) => {
    this.props.updateStateProp(e,this.props.dataProp.id)
  }
  render(){
    const title = this.props.title
    const dataProp = this.props.dataProp
    return (
        <div className="card-wrapper">
          <div className="card-inner">
              <h3>{title}</h3>
              <div className="range">
                <label className="label">{intl.get('TRY_MIN')} :</label> <input name="min" value={dataProp.min} onChange={this.onChange.bind(this)}  className="line-input range-input" type="number" />
                <label >{intl.get('TRY_MAX')}</label> <input name="max" value={dataProp.max} onChange={this.onChange.bind(this)} className="line-input range-input" type="number" style={{marginRight:"0px"}} />
              </div>
              <div className="number">
                <label className="label">{intl.get('TRY_NUM')} :</label> <input name="size" value={dataProp.size} onChange={this.onChange.bind(this)} className="line-input number-input" type="number" />
              </div>
              <div className="radio-wrapper">
                <RadioGroup name="type" onChange={this.onChange} value={dataProp.type}>
                <Radio value={0} className="font12">{intl.get('TRY_REPEATABLE')}</Radio>
                <Radio value={1} className="font12">{intl.get('TRY_ARRANGEMENT')}</Radio>
                <Radio value={2} className="font12">{intl.get('TRY_COMBINATION')}</Radio>
              </RadioGroup>
              </div>
          </div>
    </div>
    )
  }
}


export default Card
