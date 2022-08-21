import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index() {
    return await Task.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()
    const task = await Task.create(body)
    response.status(201)
    return task
  }

  public async show({ params }: HttpContextContract) {
    return await Task.findOrFail(params.id)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const body = request.body()
    const task = await Task.findOrFail(params.id)
    task.name = body.name
    task.completed = body.completed
  }
}
