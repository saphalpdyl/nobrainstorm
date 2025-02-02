import { BaseBoxShapeUtil, HTMLContainer, RecordProps, T, TLBaseShape } from 'tldraw'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Label, ResponsiveContainer, Cell } from 'recharts'
import { getComplexityColor } from '@/lib/utils'

type ComplexityTimeDataPoint = {
  name: string
  complexity: number
  time: number
}

type IComplexityTimePlot = TLBaseShape<
  'complexity-time-plot',
  {
    w: number
    h: number
    data: ComplexityTimeDataPoint[]
  }
>

export class ComplexityTimePlot extends BaseBoxShapeUtil<IComplexityTimePlot> {
  static override type = 'complexity-time-plot' as const
  static override props: RecordProps<IComplexityTimePlot> = {
    w: T.number,
    h: T.number,
    data: T.arrayOf(T.object({
      name: T.string,
      complexity: T.number,
      time: T.number
    }))
  }

  getDefaultProps(): IComplexityTimePlot['props'] {
    return {
      w: 600,
      h: 400,
      data: []
    }
  }

  component(shape: IComplexityTimePlot) {
    const { data, w, h } = shape.props

    return (
      <HTMLContainer
        style={{
          width: w,
          height: h,
        }}
        className='rounded-lg p-4 flex flex-col'
      >
        <span className="text-xl font-bold mb-2 font-shantellSans">Comparison of Approaches</span>
        <div
          className="flex-1 bg-white rounded-lg"
          
          style={{
            pointerEvents: 'all',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            fontFamily: "Shantell Sans, sans-serif",
            minHeight: '0',  // Important for flexbox
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                type="number" 
                dataKey="complexity" 
                name="Complexity" 
                domain={[0, 1]}
                tickCount={6}
                className='font-bold'
              >
                <Label 
                  value="Complexity" 
                  position="bottom" 
                  offset={2}
                  className='text-lg'
                />
              </XAxis>
              <YAxis 
                type="number" 
                dataKey="time" 
                name="Time" 
                domain={[0, 1]}
                tickCount={6}
                className='font-bold'
              >
                <Label 
                  value="Time" 
                  angle={-90} 
                  position="left" 
                  offset={0}
                  className='text-lg'
                />
              </YAxis>
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 shadow-lg rounded border">
                        <p className="font-medium">{data.name}</p>
                        <p>Complexity: {data.complexity.toFixed(2)}</p>
                        <p>Time: {data.time.toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                data={data}
                name={data.map(d => d.name).join(', ')}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={getComplexityColor(d.complexity, d.time)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </HTMLContainer>
    )
  }

  indicator(shape: IComplexityTimePlot) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }
}