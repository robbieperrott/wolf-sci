import './GenerateAutomaton.css';
import { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Button, Spin, Card, Space, Row, Col, notification, InputNumber } from 'antd';
import { SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { colorscale, plotLayout } from '../plotly_utils';

const defaultRule = 30;
const defaultSteps = 100;

export function GenerateAutomaton() {

  const [stage, setStage] = useState('select');
  const [rule, setRule] = useState(defaultRule);
  const [steps, setSteps] = useState(defaultSteps);
  const [binaryPlot, setBinaryPlot] = useState(null);

  const handleRuleChange = (rule) => {
    setRule(rule);
  }

  const handleStepsChange = (steps) => {
    setSteps(steps);
  }

  const loadVisualisation = () => {
    // TODO: What happens if we navigate away while loading
    setStage('load');
    const parameters = {
      rule: rule,
      steps: steps
    }
    axios
      .get(
        'http://localhost:8000/automata/binary_plot',
        { params: parameters }
      )
      .then(response => {
        setBinaryPlot(response.data)
        setStage('display');
      });
  }

  const reset = () => {
    setBinaryPlot(null);
    setStage('select');
  }

  const saveCellularAutomaton = () => {
    setStage('save');
    const postParams = {
      rule: rule,
      steps: steps,
      binary_plot: binaryPlot,
      date: Date()
    }
    axios
      .post('http://localhost:8000/automata/create_cellular_automaton', postParams)
      .then(() => {
        reset();
      })
      .catch(() => {
        notification['error']({
          message: 'Error',
          description: 'Automaton already exists'
        });
        reset();
      })
  }

  return (
    <div>
      { stage === 'select' && (
          <div>
            <Card 
              className='generate-card'
              title='Generate a cellular automaton'
              actions={[
                <Button
                  onClick={loadVisualisation}>
                  <b>Go</b>
                </Button>
              ]}>
              <Space direction='vertical'>
                <Row>
                  <Col span={14} style={{'textAlign': 'left'}}>
                    Rule Number
                  </Col>
                  <Col span={10}>
                    <InputNumber
                      value={rule}
                      min={0}
                      max={256}
                      onChange={handleRuleChange}
                      name='rule'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={14} style={{'textAlign': 'left'}}>
                    Steps
                  </Col>
                  <Col span={10}>
                    <InputNumber
                      value={steps}
                      min={1}
                      max={1000}
                      onChange={handleStepsChange}
                      name='steps'/>
                  </Col>
                </Row>
              </Space>
            </Card>
          </div>
        )}
        { (stage === 'load' || stage === 'save') &&
          <div>
            <Spin/>
          </div>
        }
        { stage === 'display' && (
          <div>
            <Card className='display-card' actions={[
              <SaveOutlined key='save' onClick={saveCellularAutomaton} style={{ fontSize: '140%'}} />,
              <CloseCircleOutlined key='back' onClick={reset} style={{ fontSize: '140%'}} />,
            ]}>
              <Plot 
                data={[{
                  z: binaryPlot,
                  type: 'heatmap',
                  colorscale: colorscale,
                  showscale: false
                }]}
                layout={plotLayout}
              />
            </Card>
          </div>
        )}
    </div>
  )
}