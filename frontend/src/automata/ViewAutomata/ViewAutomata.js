import './ViewAutomata.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card, Spin, Space, Modal, notification, Empty } from 'antd';
import { colorscale, thumbnailLayout, modalLayout } from '../plotly_utils';
import Plot from 'react-plotly.js';

const gridStyle = {
  width: '20%',
  height: '200px',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center'
};


export function ViewAutomata() {

  const [automata, setAutomata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/automata/get_all_cellular_automata')
      .then(response => {
        setAutomata(response.data);
        setLoading(false);
      })
      .catch(() => {
        handleErrorFetchingAutomata();
      })
      .finally(() => {
        setDeletingId(null);
      })
  }, [refreshKey]);

  const deleteAutomata = (automataId) => {
    setDeletingId(automataId);
    axios
      .delete(`http://localhost:8000/automata/delete_cellular_automaton/${automataId}`)
      .then(() => {
        setRefreshKey(refreshKey + 1);
      })
      .catch(() => {
        notification['error']({
          message: 'API Error',
          description: 'Could not delete automaton'
        });
      })
  };

  const handleErrorFetchingAutomata = () => {
    notification['error']({
      message: 'API Error',
      description: 'Could not fetch automata'
    });
    setLoading(false);
  }

  const openAutomataModal = (a) => {
    Modal.confirm({
      icon: null,
      title: `Rule ${a.rule} (${a.steps} steps)`,
      content: 
        <div>
          <Plot 
            data={[{
              z: a.binary_plot,
              type: 'heatmap',
              colorscale: colorscale,
              showscale: false
            }]}
            layout={modalLayout}
          />
        </div>,
      maskClosable: false,
      // Override ant modal cancel with delete functionality
      cancelText: 'Delete',
      onCancel: () => deleteAutomata(a.id)
    });
  }

  return(
    <div className='view-container'>
      { loading ? <Spin /> :
        automata.length ?
          <Card style={{border: 'none'}}>
            { automata.map(a =>
              deletingId === a.id ? 
                <Card.Grid key={a.id} hoverable={false} style={gridStyle}>
                  <Spin tip='Deleting...' />
                </Card.Grid>
              : <Card.Grid key={a.id} style={gridStyle} onClick={() => openAutomataModal(a)}>
                  <Space direction='vertical'>
                    <h4>Rule {a.rule} ({a.steps} steps)</h4>
                    <Plot 
                      data={[{
                        z: a.binary_plot,
                        type: 'heatmap',
                        colorscale: colorscale,
                        showscale: false
                      }]}
                      layout={thumbnailLayout}
                      config= {{displayModeBar: false}}
                    />
                  </Space>
                </Card.Grid>
            )}
          </Card>
        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No automata found' />
      }
    </div>
  );
}