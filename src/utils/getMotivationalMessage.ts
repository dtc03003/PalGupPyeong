export function getMotivationalMessage(progress: number): string {
  if (progress === 0) return "시작이 반! 가볍게 한 세트 해볼까요? 💪";
  if (progress < 25) return "좋아요! 목표를 향해 천천히 나아가고 있어요! 🚶";
  if (progress < 50) return "절반 가까이 왔어요! 계속 힘내봐요! 💥";
  if (progress < 75) return "좋아요! 이제 목표의 절반을 넘었어요! 🔥";
  if (progress < 100) return "거의 다 왔어요! 끝까지 밀어붙여요! 🏁";
  return "축하합니다! 목표를 달성했어요! 🎉";
}
