import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller";

export const container: Container = new Container();

container.bind(TasksController).toSelf().inTransientScope();

/**
 * inSingletonScope():
 * 1. Each request gets a unique User instance
 * 2. The same instance is used to across the entire application
 */

/**
 * inTransientScope()
 * 1. A new instance is created each time it is requested
 * 2. Useful when state should not be shared
 */
// container.bind(User).toSelf().inSingletonScope(); // example
// container.bind(Page).toSelf().inTransientScope(); // default inTransientScope()

/**
 * Advantages of Dependency Injection
 * 1. DECOUPLING: DI helps in decoupling components and layers in an application
 * 2. Ease of Testing: With DI becomes straightforward to test classes by mocking their dependency
 * 3. Reusablity: Components & services designed to be injected can be reused across different parts of application.
 */