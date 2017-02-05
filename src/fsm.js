class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw new Error();
        }

        this.config = config;
        this.states = ['normal', 'busy', 'hungry', 'sleeping'];
        this.prevStates = ['normal'];
        this.state = this.config.initial;
        this.currentIndexState = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.states.includes(state)) {
            throw new Error();
        }

        this.currentIndexState = this.prevStates.length;
        this.prevStates.push(state);
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const newState = this.config.states[this.state]['transitions'][event];
        if (!newState) {
            throw new Error();
        } else if (this.prevStates[this.currentIndexState + 1] !== newState) {
            this.prevStates.push(newState);
        }

        this.state = newState;
        this.currentIndexState++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial;
        this.prevStates = [];
        this.currentIndexState = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];

        if (!event) {
            return Object.keys(this.config.states);
        } else {
            Object.keys(this.config.states).forEach(state => {
                let temp = this.config.states[state]['transitions'][event];
                if (temp) {
                    states.push(state);
                }
            });

            return states;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (!this.currentIndexState) {
            return false;
        } else {
            this.state = this.prevStates[--this.currentIndexState];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {console.log(this.prevStates);
        if (this.currentIndexState === this.prevStates.length - 1) {
            return false;
        } else {
            this.currentIndexState++;
            this.state = this.prevStates[this.currentIndexState];
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.prevStates = [this.prevStates.pop()];
        this.currentIndexState = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
