import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  public async index() {
    return await Task.all()
  }

  public async store({ request, response }: HttpContextContract) {
    //  validation schema
    const newTaskSchema = schema.create({
      name: schema.string(),
      completed: schema.boolean(),
    })

    const payload = await request.validate({ schema: newTaskSchema })
    const task = await Task.create(payload)

    return response.status(201).json({ task })
  }

  public async show({ params }: HttpContextContract) {
    return await Task.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const updateTaskSchema = schema.create({
      name: schema.string.optional(),
      completed: schema.boolean.optional(),
    })

    const task = await Task.findOrFail(params.id)
    const payload = await request.validate({ schema: updateTaskSchema })

    task.merge(payload)
    return await task.save()
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
    return response.status(204)
  }
}
