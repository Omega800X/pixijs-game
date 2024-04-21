import { AbstractBall } from "./AbstractBall";

export abstract class AbstractPowerUp extends AbstractBall {
 
    public abstract powerUpEffect() : void;
}