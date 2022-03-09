const colors = {
  pale_blue: '#f0f5ff',
  pale_red: '#ffa39e'
}

export const colorscale = [[0, colors.pale_blue], [1, colors.pale_red]]

export const plotLayout = { 
  width: 400,
  height: 400,
  margin: { l: 0, r: 0, t: 0, b: 0 },
  xaxis: {
    fixedrange: true,
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  yaxis: {
    fixedrange: true,
    autorange: 'reversed',
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  hovermode: false
}

export const thumbnailLayout = { 
  width: 100,
  height: 100,
  margin: { l: 0, r: 0, t: 0, b: 0 },
  xaxis: {
    fixedrange: true,
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  yaxis: {
    fixedrange: true,
    autorange: 'reversed',
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  hovermode: false
}

export const modalLayout = { 
  width: 300,
  height: 300,
  margin: { l: 0, r: 0, t: 0, b: 0 },
  xaxis: {
    fixedrange: true,
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  yaxis: {
    fixedrange: true,
    autorange: 'reversed',
    showgrid: false, 
    zeroline: false,
    visible: false,
  },
  hovermode: false
}