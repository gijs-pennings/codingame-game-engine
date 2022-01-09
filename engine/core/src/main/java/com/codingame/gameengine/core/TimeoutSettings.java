package com.codingame.gameengine.core;

// TODO: check validity of arguments
public final class TimeoutSettings {

    private Mode mode;
    private int limit; // ms
    private int limitFirst;

    public TimeoutSettings() {
        set(50, 1000);
    }

    public void set(final int total) {
        mode = Mode.TOTAL;
        limit = total;
        limitFirst = -1;
    }

    public void set(final int perTurn, final int first) {
        mode = Mode.PER_TURN;
        limit = perTurn;
        limitFirst = first;
    }

    public <T extends AbstractPlayer> int getMaxTurnTime(final T player) {
        if (mode == Mode.PER_TURN)
            return player.hasNeverBeenExecuted() ? limitFirst : limit;
        else
            return Math.max(limit - player.getTotalTimeSpentMs(), 0);
    }

    private enum Mode { PER_TURN, TOTAL }

}
