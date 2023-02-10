import { BaseSkillTest, ServiceInterface, SkillTest } from "@app/types";

interface SkillTestsServiceInterface
  extends ServiceInterface<SkillTest, BaseSkillTest> {}

export { SkillTestsServiceInterface };
