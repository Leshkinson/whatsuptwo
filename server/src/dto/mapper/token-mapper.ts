import {UserEntity} from "../../entity/user.entity";

export class TokenMapper {
    public static prepareEntity(entity: UserEntity) {
        return {
            email: entity.email,
            isActivated: entity.isActivated
        }
    }
}