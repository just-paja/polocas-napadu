import { MatchContext } from '@polocas/core/context'

export const withStage = (Component) => (props) =>
  (
    <MatchContext.Consumer>
      {(matchContext) => (
        <Component
          {...props}
          stage={matchContext.match.currentStage}
          variables={{
            ...props.variables,
            matchStageId:
              matchContext.match &&
              matchContext.match.currentStage &&
              matchContext.match.currentStage.id,
          }}
        />
      )}
    </MatchContext.Consumer>
  )
