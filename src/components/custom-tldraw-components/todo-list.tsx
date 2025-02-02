import { BaseBoxShapeUtil, HTMLContainer, RecordProps, T, TLBaseShape } from 'tldraw';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

type TodoTask = {
  id: string;
  title: string;
  effort: string;
  deadline: string | null;
  priority: string;
};

type ITodoShape = TLBaseShape<
  'todo-shape',
  {
    w: number;
    h: number;
    tasks: TodoTask[];
  }
>;

export class TodoShapeUtil extends BaseBoxShapeUtil<ITodoShape> {
  static override type = 'todo-shape' as const;
  static override props: RecordProps<ITodoShape> = {
    w: T.number,
    h: T.number,
    tasks: T.arrayOf(
      T.object({
        id: T.string,
        title: T.string,
        effort: T.string,
        deadline: T.string.nullable(),
        priority: T.string,
      })
    ),
  };

  getDefaultProps(): ITodoShape['props'] {
    return {
      w: 300,
      h: 200,
      tasks: [
        {
          id: '1',
          title: 'Set up development environment',
          effort: 'quick',
          deadline: null,
          priority: '🟡',
        },
      ],
    };
  }

  component(shape: ITodoShape) {
    const { tasks, w, h } = shape.props;
    console.log(tasks);
    
    const [completedTasks, setCompletedTasks] = useState(new Set<string>());

    const getEffortColor = (effort: string) => {
      switch (effort?.toLowerCase()) {
        case 'quick':
          return 'bg-green-100 text-green-800';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'large':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getEffortIcon = (effort: string) => {
      switch (effort?.toLowerCase()) {
        case 'quick':
          return <CheckCircle2 className="w-4 h-4 text-green-600" />;
        case 'medium':
          return <Clock className="w-4 h-4 text-yellow-600" />;
        case 'lengthy':
          return <AlertCircle className="w-4 h-4 text-red-600" />;
        default:
          return null;
      }
    };

    const toggleTask = (taskId: string) => {
      setCompletedTasks((prev) => {
        const newCompleted = new Set(prev);
        if (newCompleted.has(taskId)) {
          newCompleted.delete(taskId);
        } else {
          newCompleted.add(taskId);
        }
        return newCompleted;
      });
    };

    return (
      <HTMLContainer
        style={{
          width: w,
          height: h,
        }}
      >
        <Card className="w-full h-full shadow-lg bg-white border-2 border-gray-200">
          <CardContent className="p-4">
            <CardTitle className='my-2 text-xl font-shantellSans'>To-do lists</CardTitle>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="space-y-2 flex items-start gap-3 cursor-pointer group"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3
                        className={`font-medium text-gray-900 flex-1 transition-all ${
                          completedTasks.has(task.id) ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.effort && (
                        <Badge
                          className={`ml-2 ${getEffortColor(task.effort)} flex items-center gap-1 ${
                            completedTasks.has(task.id) ? 'opacity-50' : ''
                          }`}
                        >
                          {getEffortIcon(task.effort)}
                          {task.effort}
                        </Badge>
                      )}
                    </div>
                    {task.deadline && (
                      <div
                        className={`flex items-center text-sm ${
                          completedTasks.has(task.id) ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {new Date(task.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </HTMLContainer>
    );
  }

  indicator(shape: ITodoShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}