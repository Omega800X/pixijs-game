import { AbstractBall } from "./AbstractBall";

export abstract class AbstractPowerUp extends AbstractBall {
 
    protected abstract powerUpEffect() : void;
}